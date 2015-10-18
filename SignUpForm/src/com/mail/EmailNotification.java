package com.mail;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import java.io.BufferedReader;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class EmailNotification extends HttpServlet{
	
	protected void doPost(HttpServletRequest iRequest, HttpServletResponse iResponse) throws ServletException, IOException {
		// TODO Auto-generated method stub
		final String username = "*****@gmail.com";
		final String password = "****";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		
	    StringBuffer sb = new StringBuffer();
	    
	    try 
	    {
	      BufferedReader reader = iRequest.getReader();
	      String line = null;
	      while ((line = reader.readLine()) != null)
	      {
	        sb.append(line);
	      }
	    } catch (Exception e) { e.printStackTrace(); }
	 
	    JSONParser parser = new JSONParser();
	    JSONObject joUser = null;
	    try
	    {
	      joUser = (JSONObject) parser.parse(sb.toString());
	    } catch (ParseException e) { e.printStackTrace(); }
	 
	    String FirstName = (String) joUser.get("name");
	    String EmailAdd = (String) joUser.get("email");
	    String DOB = (String) joUser.get("myDate");
	    String Sex = (String) joUser.get("gender");
	    String Country = (String) joUser.get("subjectList");
	    String URL = (String) joUser.get("url");
	    String Comments = (String) joUser.get("comments");

       
		System.out.println("Request...."+FirstName);

		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("from-email@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse("test222user@gmail.com"));
			message.setSubject("Recieved a new registartion mail from " + FirstName);
			
			String mailBody = "<i>Greetings Admin!</i><br>";
			mailBody += "<br><br>We have a New user Registered , please find details below</i><br><br>";
			mailBody += " Name : <b>"+FirstName+"</b><br>";
			mailBody += " Email : <b>"+EmailAdd+"</b><br>";
			mailBody += " Sex : "+Sex+"</b><br>";
			mailBody += " Country : "+Country+"</b><br>";
			mailBody += " URL : "+URL+"</b><br>";
			mailBody += " Comments : "+Comments+"</b><br><br><br>";
			
			mailBody += " Regards,<br>";
			mailBody += " Varsha<br>";
						
			message.setContent(mailBody,"text/html");
			
			Transport.send(message);
            
			System.out.println("Respnse....."+iResponse);
			System.out.println("Done");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

}
