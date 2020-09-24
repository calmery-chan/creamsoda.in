# frozen_string_literal: true

class Admin::ApplicationController < ApplicationController
  before_action :authenticate

  private

  def authenticate
    return true if Rails.env.test?

    @administrator = Administrator.find(session[:administrator_id])

    Raven.user_context(id: session[:administrator_id])
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  rescue ActiveRecord::RecordNotFound
    status 401
  end
end
