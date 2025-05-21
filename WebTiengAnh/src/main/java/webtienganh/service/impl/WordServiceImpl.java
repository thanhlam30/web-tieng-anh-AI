package webtienganh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.WordConverter;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.WordDTO;
import webtienganh.entity.Word;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.WordRepository;
import webtienganh.service.CloudinaryService;
import webtienganh.service.WordService;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class WordServiceImpl implements WordService {

	@Autowired
	private WordRepository wordRepository;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private WordConverter wordConverter;

	@Override
	public PaginationWrapper<List<WordDTO>> getList(String name, int page, int size) {

		PaginationWrapper<List<WordDTO>> wordDTOsPageResult = new PaginationWrapper<List<WordDTO>>();
		wordDTOsPageResult.setPage(page);
		wordDTOsPageResult.setSize(size);

		Page<Word> wordsPage = wordRepository.findAllByNameContaining(name, PageRequest.of(page, size));
		List<WordDTO> wordDTOs = wordsPage.toList().stream().map(wordEle -> wordConverter.toWordDTO(wordEle))
				.collect(Collectors.toList());
		wordDTOsPageResult.setData(wordDTOs);

		wordDTOsPageResult.setTotalPages(wordsPage.getTotalPages());

		return wordDTOsPageResult;
	}

	@Override
	public WordDTO save(WordDTO wordDTO) {

		validate(wordDTO);

		Word wordWasSave = wordRepository.save(wordConverter.toWord(wordDTO));

		return wordConverter.toWordDTO(wordWasSave);
	}

	private void validate(WordDTO wordDTO) {
		if (wordDTO == null || wordDTO.getId() == null || wordDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = wordDTO.getId();
		if (id != 0 && !wordRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.WORD);

	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Word word = wordRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.WORD));

		wordRepository.deleteById(id);

		String image = word.getImage();
		if (image != null) {
			String publicId = FileUtils.getPuclidId(image);
			cloudinaryService.deleteFile(publicId, "");
		}

		String sound = word.getSound();
		if (sound != null) {
			String publicId = FileUtils.getPuclidId(sound);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}
	}

	@Override
	public String uploadImage(Integer id, MultipartFile image) {

		if (id == null || id <= 0 || image == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Word word = wordRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.WORD));

		String imageString = word.getImage();
		if (imageString != null) {

			String publicId = FileUtils.getPuclidId(imageString);
			cloudinaryService.deleteFile(publicId, "");
		}

		String imageUpload = cloudinaryService.uploadFile(image, "");
		word.setImage(imageUpload);

		wordRepository.save(word);

		return imageUpload;
	}

	@Override
	public String uploadSound(Integer id, MultipartFile sound) {
		if (id == null || id <= 0 || sound == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Word word = wordRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.WORD));

		String soundString = word.getSound();
		if (soundString != null) {

			String publicId = FileUtils.getPuclidId(soundString);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

		String soundUpload = cloudinaryService.uploadFile(sound, MyConstant.VIDEO);
		word.setSound(soundUpload);

		wordRepository.save(word);

		return soundUpload;
	}
}
