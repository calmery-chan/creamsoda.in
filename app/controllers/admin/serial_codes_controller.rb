# frozen_string_literal: true

class Admin::SerialCodesController < Admin::ApplicationController
  def index
    @serial_codes = SerialCode.all.order(:id).page(params[:page]).per(10)
  end

  def create
    @serial_code = SerialCode.create!
  rescue StandardError
    status 500
  end

  def show
    @serial_code = SerialCode.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    status 404
  end

  def update
    @serial_code = SerialCode.find(params[:id])
    @serial_code.update!(state: params[:state])
  rescue ActiveRecord::RecordNotFound
    status 404
  rescue ActiveRecord::RecordNotSaved
    status 400
  end

  def destroy
    @serial_code = SerialCode.find(params[:id])
    @serial_code.destroy!
  rescue ActiveRecord::RecordNotDestroyed
    status 400
  rescue ActiveRecord::RecordNotFound
    status 404
  end
end
