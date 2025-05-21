package webtienganh.utils;

import javax.persistence.PostRemove;

import org.springframework.beans.factory.annotation.Autowired;

import webtienganh.entity.Audio;
import webtienganh.service.CloudinaryService;

public class AudioAuditListener {

	@Autowired
	private CloudinaryService cloudinaryService;

	@PostRemove
	private void removeAudio(Audio audio) {
	
		String publicId = FileUtils.getPuclidId(audio.getName());
		cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
	}

}
