package webtienganh.service.impl;

import java.io.IOException;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.CloudinaryService;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class CloudinaryServiceImpl implements CloudinaryService {

	@Autowired
	private Cloudinary cloudinaryConfig;

	public String uploadFile(MultipartFile file, String resource) {

		if (file == null || resource == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		try {

			byte[] uploadedFile = file.getBytes();
			Map<?, ?> uploadResult;

			if (resource.equals(MyConstant.VIDEO))
				uploadResult = cloudinaryConfig.uploader().upload(uploadedFile,
						ObjectUtils.asMap("resource_type", "video"));
			else
				uploadResult = cloudinaryConfig.uploader().upload(uploadedFile, ObjectUtils.emptyMap());

			return uploadResult.get("url").toString();

		} catch (Exception e) {

			throw new RuntimeException(e);
		}
	}

	@Override
	public void deleteFile(String publicId, String resource) {

		if (publicId == null || resource == null )
			throw MyExceptionHelper.throwIllegalArgumentException();

		if(publicId.trim().length() == 0)
			return;
	
		try {

			if (resource.equals(MyConstant.VIDEO))
				cloudinaryConfig.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "video"));
			else
				cloudinaryConfig.uploader().destroy(publicId, ObjectUtils.emptyMap());

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
