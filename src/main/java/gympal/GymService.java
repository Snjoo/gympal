package gympal;

import java.sql.SQLException;
import java.util.List;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;

import spark.Request;
import spark.Response;

public class GymService {
	
	final static String databaseUrl = "jdbc:h2:mem:account";
	
	public List<Routine> getAllRoutines() throws SQLException {
		// create a connection source to database
	    ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl);
	    
	    // instantiate the dao
	    Dao<Routine, String> routineDao = DaoManager.createDao(connectionSource, Routine.class);
	    
	    List<Routine> routines = routineDao.queryForAll();
	    connectionSource.close();
	    return routines;
	}
	
	public Routine getRoutine(String id) throws SQLException {
	    // create a connection source to database
	    ConnectionSource connectionSource = new JdbcConnectionSource(databaseUrl);

	    // instantiate the dao
	    Dao<Routine, String> routineDao = DaoManager.createDao(connectionSource, Routine.class);
	    
	    Routine routine = routineDao.queryForId(id);
	    connectionSource.close();
	    return routine;

	}
	
	public Routine createRoutine(Request req, Response res) {
		Routine routine = new Routine();
		
		return routine;
	}
}
