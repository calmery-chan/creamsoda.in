# frozen_string_literal: true

class AdminController < ApplicationController
  # rubocop:disable Metrics/MethodLength
  def index
    respond_to do |format|
      format.html do
        Administrator.find(session[:administrator_id])
      rescue ActiveRecord::RecordNotFound
        redirect_to admin_signin_index_path
      end

      format.json do
        Administrator.find(session[:administrator_id])
        status 200
      rescue ActiveRecord::RecordNotFound
        status 401
      end
    end
  end
  # rubocop:enable Metrics/MethodLength

  # rubocop:disable Metrics/AbcSize
  def create
    verify_recaptcha! if request.user_agent.exclude?('UnityWebRequest/1.0') && Rails.env.production?

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
  # rubocop:enable Metrics/AbcSize
end
