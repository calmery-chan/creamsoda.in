# frozen_string_literal: true

class AdminController < ApplicationController
  def create
    administrator = Administrator.find_by(name: params[:name])

    if administrator.nil? || !administrator.authenticate(params[:password])
      status 401
      return
    end

    session[:administrator_id] = administrator.id
  end
end
