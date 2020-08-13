# frozen_string_literal: true

class Admin::SerialCodesController < Admin::ApplicationController
  def index
    @serial_codes = SerialCode.all
  end
end
