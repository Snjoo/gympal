package gympal;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.db.DatabaseType;
import com.j256.ormlite.db.PostgresDatabaseType;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;

import spark.Request;
import spark.Response;

public class GymService {
	
	final static String databaseUrl = "jdbc:postgresql://localhost/test";
	final static String user = "test";
	final static String pw = "test";
	final DatabaseType dbType = new PostgresDatabaseType();
	
	public void initDb() throws SQLException {
		ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl, user, pw, dbType);
		TableUtils.createTableIfNotExists(connectionSource, Routine.class);
		TableUtils.createTableIfNotExists(connectionSource, Exercise.class);
		connectionSource.close();
	}
	
	public List<Routine> getAllRoutines() throws SQLException {
		// create a connection source to database
	    ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl, user, pw, dbType);
	    
	    // instantiate the dao
	    Dao<Routine, String> routineDao = DaoManager.createDao(connectionSource, Routine.class);
	    
	    List<Routine> routines = routineDao.queryForAll();
	    connectionSource.close();
	    return routines;
	}
	
	public Routine getRoutine(String id) throws SQLException {
	    // create a connection source to database
	    ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl, user, pw, dbType);

	    // instantiate the dao
	    Dao<Routine, String> routineDao = DaoManager.createDao(connectionSource, Routine.class);
	    
	    Routine routine = routineDao.queryForId(id);
	    connectionSource.close();
	    return routine;

	}
	
	public Routine createRoutine(Request req, Response res) throws SQLException {
		Routine routine = new Routine();
		
		routine.setName(req.queryParams("name"));
		routine.setDuration(Integer.parseInt(req.queryParams("duration")));
		routine.setToughness(Integer.parseInt(req.queryParams("toughness")));
		routine.setAdditionalInfo(req.queryParams("additionalInfo"));
		ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl, user, pw, dbType);
		Dao<Routine, String> routineDao = DaoManager.createDao(connectionSource, Routine.class);
		routineDao.create(routine);
		String exercisesJson = req.queryParams("exerciseList");
		List<Exercise> exerciseList = ExerciseJsonUtil.transformJsonToExerciseList(exercisesJson);
		for (Exercise e : exerciseList) {
			e.setRoutine(routine);
			Dao<Exercise, String> exerciseDao = DaoManager.createDao(connectionSource, Exercise.class);
			exerciseDao.create(e);
		}
		connectionSource.close();
		return routine;
	}
}
