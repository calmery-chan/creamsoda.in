class PlayerPositionChannel < ApplicationCable::Channel
  ALLOWED_PARAMETERS = ['id', 'x', 'y', 'z']

  def subscribed
    stream_from "player_position"
  end

  def receive(data)
    data.reject! { |key| ALLOWED_PARAMETERS.exclude? key }
    ActionCable.server.broadcast("player_position", data)
  end
end
