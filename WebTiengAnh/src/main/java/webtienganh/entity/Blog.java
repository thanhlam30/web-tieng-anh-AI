package webtienganh.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String slug;
	private String image;
	@Lob
	private String description;
	@Lob
	private String content;
	private LocalDate createDate;
	
	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "id", foreignKey = @ForeignKey(name="fk_blog_blogcategory"))
	private BlogCategory blogCategory;
	
}
