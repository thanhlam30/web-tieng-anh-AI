package webtienganh.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.ParagraphDTO;
import webtienganh.entity.Paragraph;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.ParagraphRepository;
import webtienganh.service.CloudinaryService;
import webtienganh.service.ParagraphService;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class ParagraphServiceImpl implements ParagraphService {

	@Autowired
	private ParagraphRepository paragraphRepository;
	@Autowired
	private CloudinaryService cloudinaryService;

	@Override
	public ParagraphDTO save(ParagraphDTO paragraphDTO) {

		if (paragraphDTO == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		int id = paragraphDTO.getId();
		Paragraph paragraph = paragraphRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.PARAGRAPH));

		int type = paragraph.getNumberPart();
		
		if(type==6 || type ==7)
			paragraph.setContent(paragraphDTO.getContent());
		
		paragraph.setTranscript(paragraphDTO.getTranscript());

		paragraphRepository.save(paragraph);

		return toParagraphDTO(paragraphRepository.save(paragraph));
	}

	public ParagraphDTO toParagraphDTO(Paragraph paragraph) {

		ParagraphDTO paragraphDTO = new ParagraphDTO();
		paragraphDTO.setId(paragraph.getId());
		paragraphDTO.setContent(paragraph.getContent());
		paragraphDTO.setImage(paragraph.getImage());
		paragraphDTO.setTranscript(paragraph.getTranscript());

		return paragraphDTO;
	}

	@Override
	public String uploadAudio(int id, MultipartFile audioFile) {

		if (id <= 0 || audioFile == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Paragraph paragraph = paragraphRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.PARAGRAPH));

		int numberPart = paragraph.getNumberPart();

		if (numberPart != 3 && numberPart != 4)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.PARAGRAPH);

		String audio = paragraph.getContent();

		if (audio != null) {
			String publicId = FileUtils.getPuclidId(audio);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

		String audioUpload = cloudinaryService.uploadFile(audioFile, MyConstant.VIDEO);

		paragraph.setContent(audioUpload);
		paragraphRepository.save(paragraph);

		return audioUpload;
	}

	@Override
	public String uploadImage(int id, MultipartFile imageFile) {

		if (id <= 0 || imageFile == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Paragraph paragraph = paragraphRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.PARAGRAPH));

		String image = paragraph.getImage();
		if (image != null) {
			String publicId = FileUtils.getPuclidId(image);
			cloudinaryService.deleteFile(publicId, "");
		}

		String imageUpload = cloudinaryService.uploadFile(imageFile, "");

		paragraph.setImage(imageUpload);
		paragraphRepository.save(paragraph);

		return imageUpload;
	}
}
