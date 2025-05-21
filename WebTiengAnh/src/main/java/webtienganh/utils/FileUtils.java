package webtienganh.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public class FileUtils {

	public static File convertMultiPartToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}

	public static String getPuclidId(String image) {
		try {
			String[] arrTempt = image.split("/");
			String fileName = arrTempt[arrTempt.length - 1];

			return fileName.split("\\.")[0];
		} catch (Exception e) {
			return "";
		}
	}

}
