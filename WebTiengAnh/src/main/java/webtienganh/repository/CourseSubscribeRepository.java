package webtienganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.CourseSubscribe;
import webtienganh.entity.CourseSubscribe_PK;

public interface CourseSubscribeRepository extends JpaRepository<CourseSubscribe, CourseSubscribe_PK> {

}
