# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'root#index'

  scope(Rails.env.production? ? '/a/dream' : '') do
    resources :admin, only: %i[index create]
    resources :serial_codes, only: [:show], param: :serial_code

    namespace :cheki do
      resources :images, only: %i[create show]
    end

    namespace :admin do
      resources :canvas, only: [:index]
      resources :serial_codes
      resources :signin, only: [:index]
      resources :works, only: [:index]
    end
  end
end
