package webtienganh.utils;

public class RoleConstant {

	public static final String ROLE_ADMIN = "ROLE_ADMIN";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String ROLE_EXAM = "ROLE_EXAM";
	public static final String ROLE_BLOG = "ROLE_BLOG";
	public static final String ROLE_VIDEO = "ROLE_VIDEO";
	public static final String ROLE_COURSE = "ROLE_COURSE";

	public static boolean checkRoleValid(String role) {

		if (role.equals(ROLE_ADMIN) || role.equals(ROLE_USER) || role.equals(ROLE_EXAM) || role.equals(ROLE_BLOG)
				|| role.equals(ROLE_VIDEO) || role.equals(ROLE_COURSE))
			return true;

		return false;
	}

	public static boolean checkNotUserAndAdmin(String role) {

		boolean isValid = checkRoleValid(role);

		if (!isValid || role.equals(ROLE_USER) || role.equals(ROLE_ADMIN))
			return false;
		
		return true;
	}
}
