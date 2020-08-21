# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'root#index'

  resources :admin, only: %i[index create]
  resources :serial_codes, only: [:show], param: :serial_code

  namespace :admin do
    resources :serial_codes

    namespace :contentful do
      resources :works, only: [:index]
    end
  end
end
