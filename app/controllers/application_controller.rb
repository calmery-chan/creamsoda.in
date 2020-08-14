# frozen_string_literal: true

class ApplicationController < ActionController::API
  def status(http_status_code)
    render status: http_status_code, body: nil
  end
end
