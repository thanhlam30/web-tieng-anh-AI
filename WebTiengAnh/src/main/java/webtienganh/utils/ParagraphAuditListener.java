package webtienganh.utils;

import javax.persistence.PostRemove;

import org.springframework.beans.factory.annotation.Autowired;

import webtienganh.entity.Paragraph;
import webtienganh.service.CloudinaryService;

public class ParagraphAuditListener {

	@Autowired
	private CloudinaryService cloudinaryService;

	@PostRemove
	private void removeParagraph(Paragraph paragraph) {

		String imageId = FileUtils.getPuclidId(paragraph.getImage());
		cloudinaryService.deleteFile(imageId, "");
		
		int numberPart = paragraph.getNumberPart();
		if(numberPart != 3 && numberPart !=4)
			return;
		
		String publicId = FileUtils.getPuclidId(paragraph.getContent());
		cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		
	}
}
