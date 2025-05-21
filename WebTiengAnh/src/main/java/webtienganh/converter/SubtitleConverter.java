package webtienganh.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.SubtitleDTO;
import webtienganh.entity.Subtitle;
import webtienganh.entity.Video;
import webtienganh.repository.SubtitleRepository;

@Component
public class SubtitleConverter {

	@Autowired
	private SubtitleRepository subtitleRepository;

	public SubtitleDTO toSubtitleDTO(Subtitle subtitle) {

		SubtitleDTO result = new SubtitleDTO();
		result.setId(subtitle.getId());
		result.setStt(subtitle.getStt());
		result.setStart(subtitle.getStart());
		result.setEnd(subtitle.getEnd());
		result.setContent(subtitle.getContent());
		result.setVideoId(subtitle.getVideo().getId());

		return result;
	}

	public Subtitle toSubtitleCrawl(SubtitleDTO subtitleDTO, Video video) {

		Subtitle result = new Subtitle();
		result.setId(subtitleDTO.getId());
		result.setStt(subtitleDTO.getStt());
		result.setContent(subtitleDTO.getContent());
		result.setStart(subtitleDTO.getStart());
		result.setEnd(subtitleDTO.getEnd());

		result.setVideo(video);

		return result;
	}

	public Subtitle toSubtitle(SubtitleDTO subtitleDTO) {

		Subtitle subtitle = subtitleRepository.findById(subtitleDTO.getId()).orElse(new Subtitle(0));

		Integer id = subtitle.getId();
		subtitle.setContent(subtitleDTO.getContent());
		subtitle.setStart(subtitleDTO.getStart());
		subtitle.setEnd(subtitleDTO.getEnd());

		if (id == 0) {

			Integer videoId = subtitleDTO.getVideoId();
			subtitle.setVideo(new Video(subtitleDTO.getVideoId()));

			int stt = subtitleRepository.countByVideoId(videoId);
			subtitle.setStt(stt);
		}

		return subtitle;
	}
}
