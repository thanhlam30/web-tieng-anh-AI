package webtienganh.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.VideoWordDTO;
import webtienganh.entity.Video;
import webtienganh.entity.VideoWord;
import webtienganh.repository.VideoWordRepository;

@Component
public class VideoWordConverter {

	@Autowired
	private VideoWordRepository videoWordRepository;

	public VideoWordDTO toVideoWordDTO(VideoWord videoWord) {

		VideoWordDTO result = new VideoWordDTO();

		result.setId(videoWord.getId());
		result.setName(videoWord.getName());
		result.setOrigin(videoWord.getOrigin());
		result.setSound(videoWord.getSound());
		result.setFrequency(videoWord.getFrequency());
		result.setVideoId(videoWord.getVideo().getId());

		return result;
	}

	public VideoWord toVideoWord(VideoWordDTO videoWordDTO) {

		Integer id = videoWordDTO.getId();
		VideoWord videoWord = videoWordRepository.findById(id).orElse(new VideoWord());

		videoWord.setName(videoWordDTO.getName());
		videoWord.setOrigin(videoWordDTO.getOrigin());
		// videoWord.setSound(videoWordDTO.getSound());
		videoWord.setFrequency(videoWordDTO.getFrequency());
		videoWord.setVideo(new Video(videoWordDTO.getVideoId()));

		return videoWord;
	}
}
