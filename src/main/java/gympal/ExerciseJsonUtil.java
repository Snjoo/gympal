package gympal;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class ExerciseJsonUtil {
	public static List<Exercise> transformJsonToExerciseList(String json) {
		return new Gson().fromJson(json, new TypeToken<List<Exercise>>(){}.getType());
	}

}
