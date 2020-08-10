# frozen_string_literal: true

class PlayerPositionChannel < ApplicationCable::Channel
  ALLOWED_PARAMETERS = %w[id x y z].freeze

  def subscribed
    @id = params['id']

    stream_from 'player_position'

    broadcast_to_group('subscribed', { id: @id })
  end

  def receive(data)
    data.reject! { |key| ALLOWED_PARAMETERS.exclude? key }

    broadcast_to_group('update', data.merge({ id: @id }))
  end

  def unsubscribed
    broadcast_to_group('unsubscribed', { id: @id })
  end

  private

  def broadcast_to_group(type, payload)
    ActionCable.server.broadcast('player_position', { type: type, payload: payload })
  end
end
