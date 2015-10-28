package gympal;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.j256.ormlite.field.DatabaseField;

import spark.ResponseTransformer;

public class JsonTransformerUtil {
	
	public static class RoutineList {
		List<JsonRoutine> routines;
	}
	
	public static class JsonRoutine {
		public int id;
		public String name;
		public String additionalInfo;
		public int duration;
		public int toughness;
		public List<Exercise> exercises;
		
	}

	public static String toJson(Object object) {
		return new Gson().toJson(object);
	}

	public static ResponseTransformer json() {
		return JsonTransformerUtil::toJson;
	}
	
	public static List<Exercise> transformJsonToExerciseList(String json) {
		return new Gson().fromJson(json, new TypeToken<List<Exercise>>(){}.getType());
	}

	public static RoutineList transformRoutinesAndExercisesToJson(List<Routine> routines, List<Exercise> exercises) {
		RoutineList routineList = new RoutineList();
		List<JsonRoutine> jsonRoutines = new ArrayList<JsonRoutine>();
		for (Routine r : routines) {
			JsonRoutine jsonRoutine = new JsonRoutine();
			jsonRoutine.id = r.getId();
			jsonRoutine.name = r.getName();
			jsonRoutine.duration = r.getDuration();
			jsonRoutine.toughness = r.getToughness();
			jsonRoutine.additionalInfo = r.getAdditionalInfo();
			List<Exercise> routineExercises = new ArrayList<Exercise>();
			for (Exercise e : exercises) {
				if (e.getRoutine().getId() == r.getId()) {
					routineExercises.add(e);
				}
			}
			jsonRoutine.exercises = routineExercises;
			jsonRoutines.add(jsonRoutine);
		}
		
		routineList.routines = jsonRoutines;
		return routineList;
		
		
	}
}
