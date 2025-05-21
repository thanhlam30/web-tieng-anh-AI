package webtienganh.utils;

import java.util.HashMap;
import java.util.Map;

import webtienganh.exception.MyExceptionHelper;

public class ToeicPoint {

	private static Map<Integer, int[]> pointsMap;

	private static void init() {
		pointsMap = new HashMap<>();
		pointsMap.put(18, new int[] { 10, 5 });
		pointsMap.put(19, new int[] { 15, 5 });
		pointsMap.put(20, new int[] { 20, 5 });
		pointsMap.put(21, new int[] { 25, 5 });
		pointsMap.put(22, new int[] { 30, 10 });
		pointsMap.put(23, new int[] { 35, 15 });
		pointsMap.put(24, new int[] { 40, 20 });
		pointsMap.put(25, new int[] { 45, 25 });
		pointsMap.put(26, new int[] { 50, 30 });
		pointsMap.put(27, new int[] { 55, 35 });
		pointsMap.put(28, new int[] { 60, 40 });
		pointsMap.put(29, new int[] { 70, 45 });
		pointsMap.put(30, new int[] { 80, 55 });
		pointsMap.put(31, new int[] { 85, 60 });
		pointsMap.put(32, new int[] { 90, 65 });
		pointsMap.put(33, new int[] { 95, 70 });
		pointsMap.put(34, new int[] { 100, 75 });
		pointsMap.put(35, new int[] { 105, 80 });
		pointsMap.put(36, new int[] { 115, 85 });
		pointsMap.put(37, new int[] { 125, 90 });
		pointsMap.put(38, new int[] { 135, 95 });
		pointsMap.put(39, new int[] { 140, 105 });
		pointsMap.put(40, new int[] { 150, 115 });
		pointsMap.put(41, new int[] { 160, 120 });
		pointsMap.put(42, new int[] { 170, 125 });
		pointsMap.put(43, new int[] { 175, 130 });
		pointsMap.put(44, new int[] { 180, 135 });
		pointsMap.put(45, new int[] { 190, 140 });
		pointsMap.put(46, new int[] { 200, 145 });
		pointsMap.put(47, new int[] { 205, 155 });
		pointsMap.put(48, new int[] { 215, 160 });
		pointsMap.put(49, new int[] { 220, 170 });
		pointsMap.put(50, new int[] { 225, 175 });
		pointsMap.put(51, new int[] { 230, 185 });
		pointsMap.put(52, new int[] { 235, 195 });
		pointsMap.put(53, new int[] { 245, 205 });
		pointsMap.put(54, new int[] { 255, 210 });
		pointsMap.put(55, new int[] { 260, 215 });
		pointsMap.put(56, new int[] { 265, 220 });
		pointsMap.put(57, new int[] { 275, 230 });
		pointsMap.put(58, new int[] { 285, 240 });
		pointsMap.put(59, new int[] { 290, 245 });
		pointsMap.put(60, new int[] { 295, 250 });
		pointsMap.put(61, new int[] { 300, 255 });
		pointsMap.put(62, new int[] { 310, 260 });
		pointsMap.put(63, new int[] { 320, 270 });
		pointsMap.put(64, new int[] { 325, 275 });
		pointsMap.put(65, new int[] { 330, 280 });
		pointsMap.put(66, new int[] { 335, 285 });
		pointsMap.put(67, new int[] { 340, 290 });
		pointsMap.put(68, new int[] { 345, 295 });
		pointsMap.put(69, new int[] { 350, 295 });
		pointsMap.put(70, new int[] { 355, 300 });
		pointsMap.put(71, new int[] { 360, 310 });
		pointsMap.put(72, new int[] { 365, 315 });
		pointsMap.put(73, new int[] { 370, 320 });
		pointsMap.put(74, new int[] { 375, 325 });
		pointsMap.put(75, new int[] { 385, 330 });
		pointsMap.put(76, new int[] { 395, 335 });
		pointsMap.put(77, new int[] { 400, 340 });
		pointsMap.put(78, new int[] { 405, 345 });
		pointsMap.put(79, new int[] { 415, 355 });
		pointsMap.put(80, new int[] { 420, 360 });
		pointsMap.put(81, new int[] { 425, 370 });
		pointsMap.put(82, new int[] { 430, 375 });
		pointsMap.put(83, new int[] { 435, 375 });
		pointsMap.put(84, new int[] { 440, 390 });
		pointsMap.put(85, new int[] { 445, 395 });
		pointsMap.put(86, new int[] { 455, 405 });
		pointsMap.put(87, new int[] { 460, 415 });
		pointsMap.put(88, new int[] { 465, 420 });
		pointsMap.put(89, new int[] { 475, 425 });
		pointsMap.put(90, new int[] { 480, 435 });
		pointsMap.put(91, new int[] { 485, 440 });
		pointsMap.put(92, new int[] { 490, 450 });
		pointsMap.put(93, new int[] { 495, 455 });
		pointsMap.put(94, new int[] { 495, 460 });
		pointsMap.put(95, new int[] { 495, 470 });
		pointsMap.put(96, new int[] { 495, 475 });
		pointsMap.put(97, new int[] { 495, 485 });
		pointsMap.put(98, new int[] { 495, 485 });
		pointsMap.put(99, new int[] { 495, 490 });
		pointsMap.put(100, new int[] { 495, 495 });
	}

	// type = 0 : listen, 1 : read
	public static int getPoint(int number, int type) {

		if (pointsMap == null)
			init();

		if (number < 0 || number > 100 || (type != 0 && type != 1))
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (number >= 0 && number <= 17)
			return 5;

		if (type == 0)
			return pointsMap.get(number)[0];

		return pointsMap.get(number)[1];
	}


}
