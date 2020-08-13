# frozen_string_literal: true

class Admin::SerialCodesController < Admin::ApplicationController
  def index
    @serial_codes = SerialCode.all.page(params[:page]).per(10)
  end
end
