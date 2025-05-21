package webtienganh.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.SubtitleDTO;
import webtienganh.dto.VideoDTO;
import webtienganh.dto.VideoSummaryDTO;
import webtienganh.dto.VideoWordDTO;
import webtienganh.entity.Subtitle;
import webtienganh.entity.Video;
import webtienganh.entity.VideoCategory;
import webtienganh.repository.VideoRepository;
import webtienganh.utils.CommonFuc;

@Component
public class VideoConverter {

	@Autowired
	private SubtitleConverter subtitleConverter;

	@Autowired
	private VideoWordConverter videoWordConverter;
	
	@Autowired
	private VideoRepository videoRepository;

	public VideoSummaryDTO toVideoSummaryDTO(Video video) {

		VideoSummaryDTO result = new VideoSummaryDTO();
		result.setId(video.getId());
		result.setName(video.getName());
		result.setSlug(video.getSlug());
		result.setImage(video.getImage());
		result.setDuration(video.getDuration());
		result.setLevel(video.getLevel());
		return result;
	}

	public VideoDTO toVideoDTO(Video video) {

		VideoDTO result = new VideoDTO();
		result.setId(video.getId());
		result.setName(video.getName());
		result.setSlug(video.getSlug());
		result.setImage(video.getImage());
		result.setDuration(video.getDuration());
		result.setUrl(video.getUrl());
		result.setDescription(video.getDescription());
		result.setLevel(video.getLevel());

		List<SubtitleDTO> subtitleDTOs = video.getSubtitles().stream()
				.map(subEle -> subtitleConverter.toSubtitleDTO(subEle)).collect(Collectors.toList());
		result.setSubtitles(subtitleDTOs);

		List<VideoWordDTO> words = video.getVideoWords().stream()
				.map(videoWordTemptEle -> videoWordConverter.toVideoWordDTO(videoWordTemptEle))
				.collect(Collectors.toList());
		result.setVideoWords(words);

		VideoCategory videoCategory = video.getCategory();
		result.setCategoryId(videoCategory.getId());
		result.setCategoryName(videoCategory.getName());

		return result;
	}

	public Video toVideoCrawl(VideoDTO videoDTO) {

		Video result = new Video();

		Integer id = videoDTO.getId();
		result.setId(id);

		String name = videoDTO.getName();
		result.setName(name);
		result.setSlug(CommonFuc.toSlug(name)+ RandomStringUtils.randomAlphanumeric(5));

		result.setImage(videoDTO.getImage());
		result.setDescription(videoDTO.getDescription());
		result.setDuration(videoDTO.getDuration());
		result.setUrl(videoDTO.getUrl());
		result.setLevel(videoDTO.getLevel());

		List<Subtitle> subtitles = videoDTO.getSubtitles().stream()
				.map(subEle -> subtitleConverter.toSubtitleCrawl(subEle, result)).collect(Collectors.toList());
		result.setSubtitles(subtitles);

		result.setCategory(new VideoCategory(videoDTO.getCategoryId()));

		return result;
	}
	
	
	public Video toVideo(VideoDTO videoDTO) {

		Integer id = videoDTO.getId();
		
		Video result = videoRepository.findById(id).orElse(new Video(0));

		String name = videoDTO.getName();
		result.setName(name);
		result.setSlug(CommonFuc.toSlug(name)+ RandomStringUtils.randomAlphanumeric(5));

		result.setDescription(videoDTO.getDescription());
		result.setDuration(videoDTO.getDuration());
		result.setLevel(videoDTO.getLevel());

		result.setCategory(new VideoCategory(videoDTO.getCategoryId(), videoDTO.getCategoryName()));

		return result;
	}
	
}
