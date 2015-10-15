package gympal;

public class ResErr {

	private String error;
	
	public String getError() {
		return this.error;
	}
	
	public ResErr(Exception e) {
		this.error = e.getMessage();
	}
	
	public ResErr(String error) {
		this.error = error ;
	}
}
