## event for log
event CreateProject:
    creator: address
    target_amount: uint256
    deadline: uint256

event Contribution:
    contributor: address
    contributed_amount: uint256

event Withdraw:
    creator: address
    amount: uint256

event Refund:
    refund_amount: uint256

## project structure for output
struct Project:
    creator: address
    title: String[100]
    description: String[500]
    target_amount: uint256
    raised_amount: uint256
    deadline: uint256
    min_contribution: uint256

## record contributor's account and donation for refund
struct Contributor:
    contributor: address
    amount: uint256

admin: address
creator: address
title: String[100]
description: String[500]
# target amount need to raise for the project
target_amount: uint256
raised_amount: uint256
# minimum contribution
min_contribution: uint256
deadline: uint256
# assume at most 10,000 contributors, fixed array in vyper
# contributors: Contributor[1024]
contributors: HashMap[int128, Contributor]
contributors_num: int128
platform_percentage: uint256


# _creator: the creator who publish the crowdfunding compaign
# _title: title of crowdfunding compaign
# description: description
# target_amount: amount want to raised
# days_limit: days limit of the compaign
# min_contribution: minimum contribution per donation(d)
@external
@payable
def __init__(_creator: address, _title: String[100], _description: String[500], 
    _target_amount: uint256, _hours_limit: uint256, _min_contribution: uint256):
    self.admin = msg.sender
    self.creator = _creator
    self.title = _title
    self.description = _description
    self.target_amount = _target_amount

    seconds_in_day: uint256 = 86400
    self.deadline =  block.timestamp + _hours_limit * 3600
    self.contributors_num = 0
    self.raised_amount = 0
    self.min_contribution = _min_contribution
    self.platform_percentage = 1

    log CreateProject(self.creator, self.target_amount, self.deadline)

# creator pay deposit for later cost
@external
@payable
def payDeposit():
    if msg.value < (self.target_amount * self.platform_percentage) / 100:
        raise "deposit not enough for the target_amount"

# contribute to a project
# automatically transfer amount(msg.value) from address(msg.sender) to the smart contract
@external
@payable
def contribute():
    # check if the project expired
    if block.timestamp > self.deadline:
        raise "this project has been expired and no longer receive contribution"
    if msg.value < self.min_contribution:
        raise "contribution should not less than min_contribution"

    # record the contribution
    self.contributors[self.contributors_num] = Contributor({contributor: msg.sender, amount: msg.value})
    self.contributors_num += 1
    self.raised_amount += msg.value

    log Contribution(msg.sender, msg.value)

# refund if cannot raise enough money in the given time
@external
def refund():
    if block.timestamp < self.deadline:
        raise "this project hasn't expired"
    # refund to all contributors
    for i in range(200):
        if i > self.contributors_num:
            break
        contributor: Contributor = self.contributors[i]
        send(contributor.contributor, contributor.amount)
    
    log Refund(self.raised_amount)

# destroy the contract from the chain & deduct platform fees
@external
def finalize():
    if block.timestamp < self.deadline:
        raise "this project hasn't expired"
    # destroy contract and send remaining Ether(0) balance to creator
    # pay platform fee
    send(msg.sender, (self.raised_amount * self.platform_percentage) / 100)

    # destroy the contract and return deposit except platform cost
    selfdestruct(self.creator)

# withdraw moneny if has raised enough money
@external
def withdraw():
    if self.raised_amount < self.target_amount and block.timestamp < self.deadline:
        raise "this project hasn't raised enough money or hasn't expired"
    assert self.creator == msg.sender, "refund function can only be called by creator"
    # transfer raised amount to the creator account
    send(self.creator, self.raised_amount)

    log Withdraw(self.creator, self.raised_amount)

@external
@view
def getDetail() -> Project:
    return Project({creator:self.creator, title: self.title, description: self.description, 
        target_amount: self.target_amount, raised_amount: self.raised_amount, 
        deadline: self.deadline, min_contribution: self.min_contribution})
    

