package gympal;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import gympal.JsonTransformerUtil.RoutineList;

public class JsonTransformerUtilTest {

	@Test
	public void test() {
		Routine routine1 = new Routine();
		routine1.setName("routine1");
		routine1.setDuration(5);
		routine1.setToughness(5);
		routine1.setAdditionalInfo("test1");
		Routine routine2 = new Routine();
		routine2.setName("routine2");
		routine2.setDuration(6);
		routine2.setToughness(6);
		routine2.setAdditionalInfo("test2");
		List<Routine> routineList = new ArrayList<Routine>();
		routineList.add(routine1);
		routineList.add(routine2);
		Exercise exercise1 = new Exercise();
		exercise1.setName("exercise1");
		exercise1.setRepetitions(1);
		exercise1.setAdditionalInfo("exerciseinfo1");
		exercise1.setRoutine(routine1);
		List<Exercise> exerciseList = new ArrayList<Exercise>();
		exerciseList.add(exercise1);
		RoutineList transformedList = JsonTransformerUtil.transformRoutinesAndExercisesToJson(routineList, exerciseList);
		assertEquals("routine1", transformedList.routines.get(0).name);
		assertEquals("routine2", transformedList.routines.get(1).name);
		assertEquals("exercise1", transformedList.routines.get(0).exercises.get(0).getName());
		assertEquals(1, transformedList.routines.get(0).exercises.get(0).getRepetitions());
	}

}
