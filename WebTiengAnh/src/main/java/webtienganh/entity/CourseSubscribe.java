package webtienganh.entity;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.IdClass;
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
@IdClass(CourseSubscribe_PK.class)
public class CourseSubscribe {

	@Id
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_coursesubscribe_user"))
	private User user;

	@Id
	@ManyToOne
	@JoinColumn(name = "course_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_coursesubscribe_course"))
	private Course course;
}
