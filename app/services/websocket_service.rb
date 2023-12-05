# app/services/websocket_service.rb

require 'websocket-eventmachine-client'

class WebsocketService
  def self.connect
    EM.run do
      ws = WebSocket::EventMachine::Client.connect(uri: 'ws://localhost:8080/ParqueoWebapp/wsnotificar_cambios')

      ws.onopen do
        puts 'Conectado al servidor WebSocket'
      end

      ws.onmessage do |msg|
        puts "Mensaje recibido: #{msg}"
        # Aquí es donde puedes manejar el mensaje recibido y realizar la petición REST según tu lógica
      end

      ws.onclose do |code, reason|
        puts "Conexión cerrada. Code: #{code}, Reason: #{reason}"
        EM.stop
      end
    end
  end
end
