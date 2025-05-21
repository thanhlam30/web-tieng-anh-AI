package webtienganh.converter;

import org.springframework.stereotype.Component;

import webtienganh.dto.VideoCategoryDTO;
import webtienganh.entity.VideoCategory;
import webtienganh.utils.CommonFuc;

@Component
public class VideoCategoryConverter {

	public VideoCategoryDTO toVideoCategoryDTO(VideoCategory videoCategory) {

		VideoCategoryDTO result = new VideoCategoryDTO();
		result.setId(videoCategory.getId());
		result.setName(videoCategory.getName());
		result.setSlug(videoCategory.getSlug());

		return result;
	}

	public VideoCategory toVideoCategory(VideoCategoryDTO videoCategoryDTO) {

		VideoCategory result = new VideoCategory();
		result.setId(videoCategoryDTO.getId());

		String name = videoCategoryDTO.getName();
		result.setName(name);
		result.setSlug(CommonFuc.toSlug(name));

		return result;
	}

}
