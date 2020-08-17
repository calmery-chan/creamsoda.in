# frozen_string_literal: true

class Administrator < ApplicationRecord
  has_secure_password
end
