package webtienganh.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Video {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	private String slug;
	private String image;
	@Lob
	private String description;
	private long duration;
	private String url;
	private int level;

	@OneToMany(mappedBy = "video", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
	private List<Subtitle> subtitles = new ArrayList<>();

	@OneToMany(mappedBy = "video", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
	private List<VideoWord> videoWords = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_video_cateogory"))
	private VideoCategory category;

	public Video(Integer id) {
		this.id = id;
	}

}
