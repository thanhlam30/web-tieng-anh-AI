package webtienganh.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.utils.ParagraphAuditListener;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(ParagraphAuditListener.class)
public class Paragraph {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String content;
	private String image;
	private String transcript;

	@OneToMany(mappedBy = "paragraph", cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
	private List<QuestionParagraph> questionParagraphs;

	public Paragraph(Integer id) {
		super();
		this.id = id;
	}

	public int getNumberPart() {

		return questionParagraphs.get(0).getQuestion().getType();
	}
}
