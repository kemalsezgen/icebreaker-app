package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.exception.SessionExistException;
import com.kemal.icebreakerapp.mapper.AnswerMapper;
import com.kemal.icebreakerapp.mapper.QuestionMapper;
import com.kemal.icebreakerapp.model.dto.*;
import com.kemal.icebreakerapp.model.entity.*;
import com.kemal.icebreakerapp.model.enums.AnswerType;
import com.kemal.icebreakerapp.model.enums.GameSessionStatus;
import com.kemal.icebreakerapp.repository.*;
import com.kemal.icebreakerapp.service.GameSessionService;
import com.kemal.icebreakerapp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.random.RandomGenerator;
import java.util.stream.Collectors;

@Service
public class GameSessionServiceImpl implements GameSessionService {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private GameSessionQuestionRepository gameSessionQuestionRepository;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AnswerMapper answerMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomUserRepository roomUserRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionMapper questionMapper;

    @Override
    public CreateSessionResponse createSession(String roomCode, Integer questionCount) {
        Optional<GameSession> existGameSession = gameSessionRepository.findByRoomCodeAndStatus(roomCode, GameSessionStatus.ACTIVE);

        if (existGameSession.isPresent()) {
            existGameSession.get().setStatus(GameSessionStatus.PASSIVE);
            gameSessionRepository.save(existGameSession.get());
        }

        GameSession gameSession = new GameSession();
        gameSession.setRoomCode(roomCode);
        gameSession.setQuestionCount(questionCount);
        gameSession.setStatus(GameSessionStatus.ACTIVE);
        GameSession savedGameSession = gameSessionRepository.save(gameSession);

        CreateSessionResponse createSessionResponse = new CreateSessionResponse();
        createSessionResponse.setSessionId(savedGameSession.getId());

        List<QuestionDTO> questionDTOList = questionService.getAllQuestions();
        List<QuestionDTO> questionListForSession = getRandomQuestions(questionDTOList, questionCount);
        createSessionResponse.setQuestionList(questionListForSession);

        // Save selected questions to GameSessionQuestion
        for (QuestionDTO question : questionListForSession) {
            GameSessionQuestion gameSessionQuestion = new GameSessionQuestion();
            gameSessionQuestion.setSessionId(savedGameSession.getId());
            gameSessionQuestion.setQuestionId(question.getId());
            gameSessionQuestionRepository.save(gameSessionQuestion);
        }

        return createSessionResponse;
    }

    @Override
    public void endSession(String roomCode) {
        gameSessionRepository.findByRoomCodeAndStatus(roomCode, GameSessionStatus.ACTIVE)
                .ifPresent(gameSession -> {
                    gameSession.setStatus(GameSessionStatus.PASSIVE);
                    gameSessionRepository.save(gameSession);
                });
    }

    @Override
    public GameSessionResultDTO getResults(String roomCode) {
        GameSession gameSession = gameSessionRepository.findByRoomCodeAndStatus(roomCode, GameSessionStatus.ACTIVE)
                .orElseThrow(() -> new SessionExistException("Session not exist."));

        Long sessionId = gameSession.getId();
        List<AnswerDTO> answerList = answerMapper.toDTOList(answerRepository.findBySessionId(sessionId));

        GameSessionResultDTO gameSessionResultDTO = new GameSessionResultDTO();
        List<QuestionDetailResultsDTO> questionDetailResultsDTOList = new ArrayList<>();
        gameSessionResultDTO.setQuestionDetailResults(questionDetailResultsDTOList);

        // Get questions for this session
        List<GameSessionQuestion> sessionQuestions = gameSessionQuestionRepository.findBySessionId(sessionId);

        // Initialize question details
        sessionQuestions.forEach(sessionQuestion -> {
            QuestionDetailResultsDTO questionDetailResultsDTO = new QuestionDetailResultsDTO();
            questionDetailResultsDTO.setOptionAChoosers(new ArrayList<>());
            questionDetailResultsDTO.setOptionBChoosers(new ArrayList<>());
            Optional<Question> questionOptional = questionRepository.findById(sessionQuestion.getQuestionId());
            questionOptional.ifPresent(question -> questionDetailResultsDTO.setQuestion(questionMapper.toDTO(question)));
            questionDetailResultsDTOList.add(questionDetailResultsDTO);
        });

        // Populate question details with answers
        answerList.forEach(answer -> {
            questionDetailResultsDTOList.stream()
                    .filter(questionDetailResultsDTO -> answer.getQuestionId().equals(questionDetailResultsDTO.getQuestion().getId()))
                    .findFirst()
                    .ifPresent(questionDetailResultsDTO -> {
                        RoomUser roomUser = roomUserRepository.findByTokenAndRoomCode(answer.getToken(), answer.getRoomCode());
                        if (roomUser != null) {
                            userRepository.findById(roomUser.getUserId())
                                    .map(User::getUsername)
                                    .ifPresent(userName -> {
                                        if (answer.getAnswer() == AnswerType.A) {
                                            questionDetailResultsDTO.getOptionAChoosers().add(userName);
                                        } else if (answer.getAnswer() == AnswerType.B) {
                                            questionDetailResultsDTO.getOptionBChoosers().add(userName);
                                        }
                                    });
                        }
                    });
        });

        return gameSessionResultDTO;
    }

    @Override
    public GameInformationDTO getGameInformation(String roomCode) {
        GameSession gameSession = gameSessionRepository.findByRoomCodeAndStatus(roomCode, GameSessionStatus.ACTIVE)
                .orElseThrow(() -> new SessionExistException("Session not exist."));

        List<GameSessionQuestion> sessionQuestions = gameSessionQuestionRepository.findBySessionId(gameSession.getId());

        List<QuestionDTO> questionDTOList = sessionQuestions.stream()
                .map(gameSessionQuestion -> questionService.getQuestionById(gameSessionQuestion.getQuestionId()))
                .toList();

        GameInformationDTO gameInformationDTO = new GameInformationDTO();
        gameInformationDTO.setQuestionList(questionDTOList);
        gameInformationDTO.setSessionId(gameSession.getId());

        return gameInformationDTO;
    }


    private Optional<GameSession> getSession(String roomCode) {
        return gameSessionRepository.findByRoomCodeAndStatus(roomCode, GameSessionStatus.ACTIVE);
    }

    private List<QuestionDTO> getRandomQuestions(List<QuestionDTO> questionDTOList, Integer questionCount) {
        RandomGenerator random = RandomGenerator.of("Random");

        return random.ints(0, questionDTOList.size())
                .distinct()
                .limit(questionCount)
                .mapToObj(questionDTOList::get)
                .collect(Collectors.toList());
    }
}
