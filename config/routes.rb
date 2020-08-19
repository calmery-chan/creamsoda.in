# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'root#index'

  resources :admin, only: [:create]
  resources :serial_codes, only: [:show], param: :serial_code

  namespace :admin do
    resources :ping, only: [:index]
    resources :serial_codes
  end
end
