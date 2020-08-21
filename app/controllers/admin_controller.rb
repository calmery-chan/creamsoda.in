# frozen_string_literal: true

class AdminController < ApplicationController
  def index
    Administrator.find(session[:administrator_id])
    status 200
  rescue ActiveRecord::RecordNotFound
    status 401
  end

  def create
    verify_recaptcha!

    administrator = Administrator.find_by(name: params[:name])

    if administrator.nil? || !administrator.authenticate(params[:password])
      status 401
      return
    end

    session[:administrator_id] = administrator.id
    status 200
  rescue Recaptcha::VerifyError
    status 401
  end
end
