package com.core.plus.common;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import com.google.gson.Gson;

public class JsonView extends AbstractView {

	public static final String DEFAULT_CONTENT_TYPE = "text/plain; charset=UTF-8";
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType( DEFAULT_CONTENT_TYPE );
		PrintWriter out = response.getWriter();
		for (Map.Entry<String, Object> entry : model.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			Gson gson = new Gson();
			String jsonCode = "var " + key + "=" +gson.toJson(value) + ";";
			out.print(jsonCode);
		}
	}

}
