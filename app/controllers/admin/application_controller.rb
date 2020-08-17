# frozen_string_literal: true

class Admin::ApplicationController < ApplicationController
  include ActionController::Cookies

  before_action :authenticate

  private

  def authenticate
    return true if Rails.env.test?

    @administrator = Administrator.find(session[:administrator_id])
  rescue ActiveRecord::RecordNotFound
    status 401
  end
end
