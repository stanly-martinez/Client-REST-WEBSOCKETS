# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    # Aquí se debe obtener el JSON desde REST
    # JSON de muestra para el diseño

    json_data = '[{"ID": 1, "DESDE": "2023-01-01", "HASTA": "2023-01-10", "ESPACIO": "Oficina A"},
    {"ID": 2, "DESDE": "2023-01-15", "HASTA": "2023-01-20", "ESPACIO": "Oficina B"}]'
    
    @table_data = JSON.parse(json_data).to_json.html_safe
    puts "@table_data: #{@table_data.inspect}"
  end
end
