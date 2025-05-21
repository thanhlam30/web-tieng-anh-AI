package webtienganh.entity;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VideoWord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	private String origin;
	private String sound;
	private int frequency;

	@ManyToOne
	@JoinColumn(name = "video_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_videoword_video"))
	private Video video;

	public VideoWord(Integer id) {
		this.id = id;
	}

}
