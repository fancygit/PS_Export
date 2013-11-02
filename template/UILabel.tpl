	UILabel *<name> = [[UILabel alloc] initWithFrame:CGRectMake(<x>, <y>, <w>, <h>)];
	<name>.backgroundColor = [UIColor clearColor];
	<name>.text = @"<content>";
	<name>.font = [UIFont fontWithName:@"<font>" size:<fontsize>];
	[<name> setTextColor:[UIColor colorWithRed:<r> green:<g> blue:<b> alpha:1.0]];
	[self.baseView addSubview:<name>];
	
