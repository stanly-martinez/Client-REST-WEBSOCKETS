class NotificarCambiosChannel < ApplicationCable::Channel
  def subscribed
     stream_from "notificar_cambios_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # Llamada al servidor
#  def receive(data)
    #manejar mensaje recibido
    #ejemplo, mandar un mensaje al servidor
#    ActionCable.server.broadcast("notificar_cambios_channel", {response: "Mensaje recibido: #{data['message']}" })
#  end
end
