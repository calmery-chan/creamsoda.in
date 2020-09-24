# frozen_string_literal: true

class SerialCodesController < ApplicationController
  def show
    serial_code = SerialCode.find_by!(serial_code: params['serial_code'])

    if serial_code.allowed?
      status 200
      return
    end

    status 401 if serial_code.created?
    status 403 if serial_code.denied?
  rescue ActiveRecord::RecordNotFound
    status 401
  end
end
