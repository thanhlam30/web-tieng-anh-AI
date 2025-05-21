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
public class Subtitle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private int stt;
	private long start;
	private long end;
	private String content;

	@ManyToOne
	@JoinColumn(name = "video_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_subtitle_video"))
	private Video video;

	public Subtitle(Integer id) {
		
		this.id = id;
	}
}
