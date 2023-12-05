# app/controllers/welcome_controller.rb

require 'net/http'

class WelcomeController < ApplicationController
  def index
    # Aquí se debe obtener el JSON desde REST
    url = URI.parse('http://localhost:8080/ParqueoWebapp-1.0-SNAPSHOT/resources/reserva')
    http = Net::HTTP.new(url.host, url.port)

    # Desactivas la siguiente linea sino se esta usando https
    #http.use_ssl = true

   request = Net::HTTP::Get.new(url.path)

    response = http.request(request)

    if response.content_type == 'application/json'
      begin
        @table_data = @json_data = JSON.parse(response.body).to_json.html_safe
        puts "@table_data: #{@table_data.inspect}"

        # Transmitir datos a travez de Action Cable (ws)
        ActionCable.server.broadcast('notificar_cambios_channel', @table_data)
      rescue JSON::ParserError => e
       # Maneja el error, por ejemplo, imprime el mensaje de error
        puts "Error al parsear JSON: #{e.message}"
      end
    else
      # Maneja el caso en que la respuesta no es un JSON válido
      puts "La respuesta no es un JSON válido. Content-Type: #{response.content_type}"
    end

    # @json_data = JSON.parse(reponse.body)

    # JSON de muestra para el diseño

#    json_data = '[{"ID": 1, "DESDE": "2023-01-01", "HASTA": "2023-01-10", "ESPACIO": "Oficina A"},
#    {"ID": 2, "DESDE": "2023-01-15", "HASTA": "2023-01-20", "ESPACIO": "Oficina B"},{"ID": 1, "DESDE": "2023-01-01", "HASTA": "2023-01-10", "ESPACIO": "Oficina C"},
#    {"ID": 2, "DESDE": "2023-01-15", "HASTA": "2023-01-20", "ESPACIO": "Oficina D"},{"ID": 1, "DESDE": "2023-01-01", "HASTA": "2023-01-10", "ESPACIO": "Oficina E"},
#    {"ID": 2, "DESDE": "2023-01-15", "HASTA": "2023-01-20", "ESPACIO": "Oficina F"},{"ID": 1, "DESDE": "2023-01-01", "HASTA": "2023-01-10", "ESPACIO": "Oficina G"},
#    {"ID": 2, "DESDE": "2023-01-15", "HASTA": "2023-01-20", "ESPACIO": "Oficina H"}]'
    
#    @table_data = JSON.parse(json_data).to_json.html_safe
#    puts "@table_data: #{@table_data.inspect}"
  end
end
