package webtienganh.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VideoCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	private String slug;

	public VideoCategory(Integer id) {
		super();
		this.id = id;
	}

	public VideoCategory(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

}
