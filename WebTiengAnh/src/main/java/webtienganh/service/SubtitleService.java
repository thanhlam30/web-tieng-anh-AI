package webtienganh.service;

import webtienganh.dto.SubtitleDTO;

public interface SubtitleService {

	SubtitleDTO save(SubtitleDTO subtitleDTO);

	void delete(Integer videoId);
}
